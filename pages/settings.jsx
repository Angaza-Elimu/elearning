import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { validToken, newPassword as newPasswordApi } from "../api/auth";
import { user as userApi } from "../api/user";
import { Camera, avatar } from "../assets";
import { Button, Header, Input, Layout, Modal, Notification } from "../components";
import authGuard from "../util/authGuard";

export default function SettingsPage({ user }) {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const router = useRouter();
  const token = Cookies.get("token");

  const handleChangePassword = async () => {
    setSubmitting(true);

    const changePasswordData = {
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };

    try {
      const { data, status } = await newPasswordApi({ ...changePasswordData }, token);

      if (status !== 200)
        return toast(<Notification message="An error occurred, please retry." type="danger" />);

      if (data.status === 400) return toast(<Notification message={data.message} type="danger" />);

      setOpenModal(false);
      toast(<Notification message={data.message} type="success" />);

      // reset the form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      toast(<Notification message="An error occurred, please retry." type="danger" />);
    } finally {
      setSubmitting(false);
    }
  };

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title="Settings">
      <div className="lg:my-auto lg:mt-4 max-w-7xl">
        <Header text="My Profile" />
        <div className="flex flex-col gap-10 pb-5 flex-1 h-full">
          <div className="bg-light flex flex-col md:flex-row gap-8 md:gap-14 lg:mt-4 py-5 lg:py-9 lg:px-2 rounded-xl items-center">
            <div className="relative h-56 w-56 md:h-40 md:w-40">
              <Image
                // src={profilePicBase64 ? profilePicBase64 : profileImage}
                src={avatar}
                layout="fill"
                className="rounded-full"
                alt="profile picture"
              />

              <label
                className="absolute bg-alerts-info rounded-full p-2 right-2 md:right-0 bottom-2 md:bottom-0 h-12 w-12 md:h-11 md:w-11 cursor-pointer"
                htmlFor="imageUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  // onChange={handleImageChange}
                />
                <Camera />
              </label>
            </div>

            <div className="grid w-full lg:grid-cols-2 md:p-3 flex-1 gap-8 gap-y-4">
              <Input
                label="First Name"
                disabled
                value={user?.firstname}
                labelBackground="bg-neutral-900"
              />
              <Input
                disabled
                label="Last Name"
                value={user?.lastname}
                labelBackground="bg-neutral-900"
              />
              <Input
                disabled
                label="Email Address"
                type="email"
                value={user?.email || "N/A"}
                labelBackground="bg-neutral-900"
              />
              <Input
                label="Phone Number"
                type="number"
                disabled
                value={+user?.phone || Number("000")}
                labelBackground="bg-neutral-900"
              />
            </div>
          </div>

          <div className="flex flex-wrap md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-xl py-6 px-8 bg-shade-light flex flex-col gap-10 col-span-1 overflow-hidden hover:drop-shadow transition-all duration-200 ease-out w-full md:min-w-[300px] md:max-w-[310px] lg:max-w-[360px]">
              <div className="">
                <p className="font-semibold text-xl">Change password</p>
                <p className="text-neutral-500 pt-2">
                  Your password must be more that six characters
                </p>
              </div>

              <div className="mt-auto">
                <Button
                  name="Change Password"
                  type="SECONDARY"
                  className="py-2 px-4 text-base w-full hover:!text-shade-light !text-primary-600 bg-transparent"
                  onClick={() => setOpenModal(true)}
                />
              </div>
            </div>

            <div className="rounded-xl py-6 px-8 bg-shade-light flex flex-col gap-10 col-span-1 blur-[3px] overflow-hidden hover:drop-shadow transition-all duration-200 ease-out w-full md:min-w-[300px] md:max-w-[310px] lg:max-w-[360px] relative">
              <div className="absolute bg-shade-light/20 top-0 bottom-0 right-0 left-0"></div>
              <div className="">
                <p className="font-semibold text-xl">My learning plan</p>
                <p className="text-neutral-500">
                  Your current learning plan is: Weekly
                  <br />
                  Expires on: Oct 26, 2022
                </p>
              </div>

              <div className="mt-auto">
                <Button
                  name="Change Plan"
                  type="SECONDARY"
                  className="py-2 px-4 text-base w-full hover:!text-shade-light !text-primary-600 bg-transparent"
                  // onClick={() => openModal()}
                />
              </div>
            </div>
          </div>

          <div className="content-end flex flex-1 mt-auto">
            <div className="flex flex-1 flex-wrap items-center justify-center md:justify-end gap-y-1 gap-x-8">
              <Button
                className="w-full md:w-auto hover:!text-shade-light !text-primary-600"
                name="Cancel"
                onClick={() => router.back()}
                type="SECONDARY"
              />
              <Button className="w-full md:w-auto" name="Save Changes" onClick={() => {}} />
            </div>
          </div>
        </div>

        {/* modal of change password */}
        <Modal
          isOpen={openModal}
          title="Change Password"
          subtitle="Provide your new password below"
          onClose={setOpenModal}
        >
          <div className="my-6 space-y-6">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm new Password"
              type="password"
              placeholder="••••••••"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            {newPassword && confirmNewPassword && newPassword !== confirmNewPassword && (
              <p className="!my-2 pl-1 text-sm text-alerts-danger">Passwords must be same</p>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              className="hover:!text-shade-light !text-primary-600"
              name="Cancel"
              onClick={() => setOpenModal(false)}
              type="SECONDARY"
            />
            <Button
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword ||
                submitting
              }
              name="Submit"
              loading={submitting}
              onClick={handleChangePassword}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies } }) => {
  authGuard(cookies);
  const { data: user } = await userApi(cookies.token);

  return {
    props: { user },
  };
};
