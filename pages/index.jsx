import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import logoWhite from "../public/images/logo-white.svg";
import { Button, Header, Input, Modal, Notification, Title } from "../components";
import { changePassword, loginApi, loginWithToken, resetByPhone, validToken } from "../api/auth";
import { setToken, setProfile } from "../store/features/profileSlice";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [disableLoginButton, setDisableLoginButton] = useState(false);
  const { grade } = useSelector((state) => state.grade);

  const [resetPhoneNumber, setResetPhoneNumber] = useState("");
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    setDisableLoginButton(true);
    e.preventDefault();

    try {
      const { data, status } = await loginApi(username, password);

      if (status === 200) {
        loginWithToken(data.access_token);
        dispatch(setToken(data.access_token));
        dispatch(setProfile(data.user));

        if (grade?.learning_system !== data.user?.learning_system)
          return router.replace("/welcome");

        return router.replace("/learn");
      } else {
        setDisableLoginButton(false);
        toast(<Notification type="danger" message={data.message} />);
      }
    } catch (error) {
      setDisableLoginButton(false);
      toast(<Notification type="error" message="Something went wrong, please try again." />);
    }
  };

  const sendResetCodeToPhone = async () => {
    setSubmitting(true);
    try {
      const { data, status } = await resetByPhone(resetPhoneNumber);
      if (status === 200) {
        toast(<Notification type="success" message={data.message} />);
        return setChangePasswordModal(true);
      }
    } catch (error) {
      toast(<Notification type="error" message="Something went wrong, please try again." />);
    } finally {
      setSubmitting(false);
    }
  };
  const handleOpenPasswordResetModal = () => {
    //Opens modal from the input of phone number modal with no input
    setChangePasswordModal(false);
    setResetPhoneNumber("");
    setResetCode("");
    setNewPassword("");
    setConfirmNewPassword("");

    setOpenModal(true);
  };

  //redirects to learn if user is logged in
  useEffect(() => {
    validToken() ? router.push("/learn") : setLoading(false);
  }, []);

  return loading ? null : (
    <>
      <Title name="Log In" />

      <div className="grid grid-cols-12 h-screen bg-primary-c9 md:bg-[#FBFBFB] relative">
        <div className="md:col-span-5 md:flex items-center justify-center bg-primary-c9 text-shade-light relative hidden px-10">
          <div className="h-16 w-16 absolute top-20 left-20">
            <Image src={logoWhite} layout="fill" />
          </div>
          <div className="flex flex-col mx-auto gap-5 justify-center">
            <h2 className="font-bold text-5xl">Welcome back!</h2>

            <div className="w-3/5">
              <p>We love your consistency in learning with us. Sign in and keep studying.</p>
            </div>
          </div>
        </div>

        {/* login session */}
        <div className="flex col-span-full mx-auto my-auto md:hidden w-4/5">
          <div className="absolute top-4 left-4 h-10 w-10">
            <Image src={logoWhite} layout="fill" />
          </div>
          <div className="flex flex-col text-shade-light text-center">
            <h2 className="font-medium text-2xl">Welcome back!</h2>

            <div className="text-base font-light">
              <p>We love your consistency in learning with us. Sign in and keep studying.</p>
            </div>
          </div>
        </div>

        <div className="col-span-full md:col-span-7 p-5 flex items-center relative flex-col justify-between bg-[#FBFBFB] rounded-t-3xl gap-1 md:my-auto">
          <div className="mb-5 flex flex-col gap-1.5">
            <Header text="Sign in to your account" className="text-[1.45em]" />

            <p className="text-center text-neutral-500 text-sm md:text-base">
              Don’t have an account?{" "}
              <Link passHref href="/signup">
                <a>
                  <span className="text-primary-700 font-semibold cursor-pointer hover:underline text-base">
                    Sign Up
                  </span>
                </a>
              </Link>
            </p>
          </div>

          <div className="mx-auto w-full md:max-w-md flex flex-col justify-start flex-1">
            <div className="flex flex-col gap-1 md:gap-4">
              <Input
                label="Username"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="johndoe"
                required
              />
              <Input
                label="Password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="••••••••"
                required
              />

              <p
                className="text-sm text-primary-700 mt-1 md:-mt-3 cursor-pointer hover:underline md:font-medium"
                onClick={handleOpenPasswordResetModal}
              >
                Forgot Password?
              </p>

              <Button
                name="Log In"
                className="mt-3 text-shade-light flex justify-center items-center"
                onClick={handleLogin}
                loading={disableLoginButton}
                disabled={!username || !password || disableLoginButton}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModal}
        onClose={setOpenModal}
        title={!changePasswordModal ? "Forgot Your Password?" : "Let's change your password"}
        subtitle={
          !changePasswordModal && (
            <>
              <p>Kindly enter your phone number below.</p>
              <p>We will send you a reset link</p>
            </>
          )
        }
      >
        {!changePasswordModal ? (
          <div className="pt-5">
            <Input
              label="Phone number"
              placeholder="0700 xxxxxx"
              type="tel"
              value={resetPhoneNumber}
              onChange={(e) => setResetPhoneNumber(e.target.value)}
            />

            <div className="flex flex-row justify-between items-center gap-5 pt-8">
              <Button
                className="text-primary-c9 flex-1"
                name="Cancel"
                onClick={() => setOpenModal(false)}
                type="SECONDARY"
              />
              <Button
                name="Confirm"
                className="flex-1"
                disabled={!resetPhoneNumber || submitting}
                loading={submitting}
                onClick={() => sendResetCodeToPhone()}
              />
            </div>
          </div>
        ) : (
          <div className="py-10 pt-6">
            <div className="flex flex-col gap-2 pb-6">
              <Input
                label="Reset code"
                type="password"
                maxLength={5}
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="•••••"
              />

              <Input
                label="Enter new password"
                placeholder="••••••••"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Input
                label="Confirm new password"
                placeholder="••••••••"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              {/* handle password mismatch error */}
              {newPassword.length > 0 &&
                confirmNewPassword.length > 0 &&
                newPassword !== confirmNewPassword && (
                  <p className="text-alerts-danger text-sm -mt-3 md:-mt-4 pl-1">
                    password does not match
                  </p>
                )}
            </div>

            <Button
              name="Confirm"
              className="flex-1 w-full"
              disabled={
                !resetCode ||
                !newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword ||
                submitting
              }
              loading={submitting}
              onClick={() => handleResetPassword()}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
