import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useAuth } from "../Hooks/useAuth";
import OtpInput from "react-otp-input";

export default function FormPage() {
  const { isLogined, setIsLogined, user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fullName: "",
    otp: -1,
  });
  const [currotp , setOtp] = useState('') ; 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    setFormData((prev)=>{
        return {...prev , otp : currotp }
    })
  }, [currotp])

  async function handleSendNumber(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/loginuser",
        {
          phoneNumber: "+" + formData.phoneNumber,
        }
      );

      if (data.success) {
        //console.log('Otp is Sent')
        toast.success("OTP Sent Successfully");
        setIsLogined(1);
      }
    } catch (err) {
      toast.error("Something Went Wrong!!");
    } finally {
      setLoading(false);
    }
    
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/verifyuser",
        {
          phoneNumber: "+" + formData.phoneNumber,
          otp: formData.otp,
        }
      );

      if (data.success === true) {
        console.log(data.data);
        //console.log('Otp is Sent')
        toast.success("Logined!!");
        localStorage.setItem("token", data.token);
        //set user in global state to data.data
        setUser(data.data);
        if (data.data.fullName) {
          //router.push
          navigate("/dashboard");
          return;
        }
        setIsLogined(2);
        setOtp('') ; 
      }
    } catch (err) {
      toast.error("Something Went Wrong!!" , err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.put(
        "http://127.0.0.1:3000/api/v1/users/me",
        {
          fullName: formData.fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      
      if (data.data.success) {
        console.log('It is reaching here')
        toast.success("Updated!!");
        //set user in global state to data.data
        setUser(data.data);
        
        console.log(data.data);
        console.log(data.data.data.fullName) ; 
        if (data.data.data.fullName) {
          navigate("/dashboard");
        }
        setIsLogined(3);
      }
    } catch (err) {
      toast.error("Something Went Wrong in updating the user!!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form">
      <div className="wrapper-class">
        <div className="helper-class"></div>
        {isLogined === 0 && (
          <form action="" onSubmit={handleSendNumber}>
            <h1>
              Login to <span>Contact App</span>
            </h1>
            <label htmlFor="phonenum">Phone Number</label>
            <PhoneInput
              className="phonenumber"
              id="phonenum"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e,
                })
              }
              country={"in"}
            />
            <input
              className="submit-btn"
              disabled={loading}
              type="submit"
              value="Send OTP"
            />
          </form>
        )}
        {isLogined === 1 && (
          <form className="otp" onSubmit={handleVerifyOTP}>
            <h1 className="">
              Your otp is sent to{" "}
              <span className="text-blue-500">
                {" "}
                {`+${formData.phoneNumber.slice(
                  0,
                  2
                )} ${formData.phoneNumber.slice(2)}`}
              </span>{" "}
              It will valid only for next{" "}
              <span className="text-blue-500">10 minutes</span>{" "}
            </h1>
            <label htmlFor="otp">Enter Your OTP</label>
            <OtpInput
              className='otp-input'
              value={formData.otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span><pre> - </pre></span>}
              renderInput={(props) => <input {...props} />}
            />
            <input className="submit-btn" type="submit" value="Verify" />
          </form>
        )}
        {/* {currState === 'signup' && <form>
                } */}
        {isLogined === 2 && !user.fullName && (
          <form className="sign-up" onSubmit={handleUpdateUser}>
            <h1>You are visiting for the first time. Please tell us your Good name  </h1>
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              value={formData.fullName}
              onChange={(e) => {
                setFormData((prev) => {
                  return { ...prev, fullName: e.target.value };
                });
              }}
            />
            <input className="submit-btn" type="submit" value="Save" />
          </form>
        )}
      </div>
    </div>
  );
}
