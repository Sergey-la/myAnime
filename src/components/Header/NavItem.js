
const NavItem = ({name, sum, filter, onFilterSelect}) => {

   const activeClass = filter === name;
   const clazz = activeClass ? 'Header-menu__item _active' : 'Header-menu__item';
   
   return (
      <li className={clazz} onClick={() => onFilterSelect(name)}>
         <span>{name}: {sum}</span>
      </li>
   );
}

export default NavItem;