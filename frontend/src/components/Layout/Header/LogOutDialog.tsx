import useLogOut from "@/hooks/Auth/UseLogout";
import { IoLogOut } from "react-icons/io5";

const LogOutDialog = () => {
  const { logout } = useLogOut();

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div
        className="flex items-center gap-3"
        onClick={() => {
          const dialog = document.getElementById(
            "logout_modal"
          ) as HTMLDialogElement;
          dialog.showModal();
        }}
      >
        <li>
          <a>
            Logout <IoLogOut className="text-error h-6 w-6" />
          </a>
        </li>
      </div>
      <dialog id="logout_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Are you sure you want to logout ???</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button className="btn btn-error" onClick={logout}>
                Yes, Logout{" "}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default LogOutDialog;
