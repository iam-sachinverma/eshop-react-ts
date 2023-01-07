import { FC } from "react";
import NavigationItem from "./NavigationItem";

interface NavigationProps {
  navigation?: any;
}

const Navigation: FC<NavigationProps> = ({ navigation }) => {
  
  return (
    <ul className="nc-Navigation flex items-center mx-4">
      {navigation?.data?.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
