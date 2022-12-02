import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Debit",
        isMoney: false,
        link: "total debit",
        
      };
      break;
    case "order":
      data = {
        title: "Credit",
        isMoney: false,
        link: "total credit",
       
      };
      break;
    case "earning":
      data = {
        title: "Opening Balance",
        isMoney: true,
        link: "opening balance",
    
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "Account balance",
       
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "#"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {diff} %
        </div>
      </div>
    </div>
  );
};

export default Widget;
