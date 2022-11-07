export default function Notification({ message, type }) {
  let title = "",
    className = "";

  switch (type?.toLowerCase()) {
    case "success":
      className = "bg-secondary-600/70 ";
      break;

    case "info":
      className = "bg-primary-600/70 ";
      break;

    case "warning":
      className = "bg-alerts-warning/70 ";
      break;

    case "danger":
      className = "bg-alerts-danger2/70 ";
      break;

    default:
      className = "bg-primary-600/70 ";
      break;
  }
  return (
    <div className="rounded-xl">
      <div className={`flex ${className} text-shade-light`}>
        <div className={`w-1.5 ${className}`}></div>
        <div className="flex p-3 py-3 gap-3">
          {/* <div className={`h-6 w-6 rounded-full mt-1.5 ${className}`}></div> */}

          <div className="flex flex-col py-1">
            {/* <h3 className="text-dark font-bold text-xl pb-1">{title}</h3> */}
            <p className="text-base">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
