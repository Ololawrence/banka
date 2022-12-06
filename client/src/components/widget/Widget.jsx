import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  const balance = JSON.parse(localStorage.getItem("transactions"));
  const bal = JSON.parse(localStorage.getItem("user"));
  console.log(bal)
  let current = "";
balance?.map((bal) => {
  return current =bal.currentbalance 
})
  //temporary
  const amount =current || bal?.data?.openingbalance ;
  const diff = 20;
const acctnum = bal?.data?.accountnumber
  switch (type) {
    case "user":
      data = {
        title: "Account Number",
        acctnum: acctnum,
        link: "acount number",
        
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: amount,
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
          {data?.isMoney || data?.acctnum} 
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
