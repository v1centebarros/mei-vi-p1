export const Card = ({title, children}) => {
  return <div className={"col-span-4 card bg-base-100 shadow-2xl"}>
    <div className={"card-body"}>
      <div className={"card-title"}>{title}</div>
    </div>
    {children}
  </div>
};