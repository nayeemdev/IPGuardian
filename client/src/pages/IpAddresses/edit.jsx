import AppLayout from "components/Layouts/AppLayout";
import Button from "components/Common/Button";
import SessionMessage from "components/Common/SessionMessage";
import Label from "components/Common/Label";
import Input from "components/Common/Input";
import useValidator from "hooks/useValidator";
import { useEffect, useState } from "react";
import { IpAddressService } from "services/IpAddressService";
import { useParams } from "react-router-dom";

const IpAddressEdit = () => {
  const params = useParams();
  
  const [ip_address, setIpAddress] = useState("");
  const [label, setLabel] = useState("");
  
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);
  const [validator, showValidationMessage] = useValidator({
    serverErrors: errors,
  });
  const [buttonLoading, setButtonLoading] = useState(false)
  
  useEffect(() => {
    LoadDetails();
  }, []);
  
  const LoadDetails = async () => {
    const response = await IpAddressService.get(params.id);
    const data = response.data.data;
    setIpAddress(data.ip_address);
    setLabel(data.label);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setButtonLoading(true)
    setStatus("");

    if (!validator.allValid()) {
      showValidationMessage(true);
      setButtonLoading(false)
      if (!errors || errors.length == 0) {
        return;
      }
    }
    
    const data = {
        ip_address,
        label
    }
    
    IpAddressService.update(params.id, data).then((response) => {
        setStatus(response.data.msg);
        showValidationMessage(false);
    }).catch((error) => {
        setStatus("Something went wrong.");
        const response = error.response;
        setErrors(response.data.errors);
    });
    
    setButtonLoading(false)
  };
  return (
    <AppLayout
      header={
        <>
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              IP Address Edit
            </h2>
            <a
              href="/ip-addresses"
              className="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase"
            >
              {" "}
              Back to list{" "}
            </a>
          </div>
        </>
      }
    >
      <div className="py-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center pt-6 sm:pt-0">
          <div className="w-full sm:max-w-md mt-6 px-6 py-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <SessionMessage className="mb-4" status={status} />
            <form onSubmit={submitForm}>
              <div className="mt-2">
                <Label htmlFor="ip">
                  IP <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="ip"
                  type="text"
                  value={ip_address}
                  className="block mt-1 w-full"
                  onChange={(event) => setIpAddress(event.target.value)}
                />
                {validator.message("ip_address", ip_address, "required|ip")}
              </div>
              <div className="mt-2">
                <Label htmlFor="label">
                  Label <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="label"
                  type="text"
                  value={label}
                  className="block mt-1 w-full"
                  onChange={(event) => setLabel(event.target.value)}
                />
                {validator.message("label", label, "required")}
              </div>
              <div className="flex items-center justify-end mt-4">
                <Button type="submit" loading={buttonLoading} className="ml-3">Update</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IpAddressEdit;
