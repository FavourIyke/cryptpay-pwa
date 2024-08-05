import { useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  to: string;
}

const Redirect: React.FC<Props> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
};

export default Redirect;
