import { Button } from "../../components/ui/button";

const ButtonAction = ({ children }: any) => {
  return (
    <div className="test">
      <Button className="bg-red-500 text-white">{children}</Button>;
    </div>
  );
};

export default ButtonAction;
