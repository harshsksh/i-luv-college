import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddNew = ({ authUser }: { authUser: any }) => {
  return (
    <div className="card bg-primary shadow-xl  text-primary-content mq450:w-full">
      <div className="card-body flex flex-col justify-between">
        <div>
          <h2 className="card-title text-3xl">
            Can't find your sh*tty college?
          </h2>
          <div className="flex flex-col  mt-3 gap-1 justify-center">
            <span>Add your college so that everyone can sh*tpost on it !</span>
          </div>
        </div>

        <div className="card-actions mt-3  justify-center">
          {!authUser ? (
            <Link to={"/auth/login"} className="w-full">
              <button className="btn btn-block  ">
                <FaPlus /> Add your College
              </button>
            </Link>
          ) : (
            <Link to={"add"} className="w-full">
              <button className="btn btn-block  ">
                <FaPlus /> Add Your College
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNew;
