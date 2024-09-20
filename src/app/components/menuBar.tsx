
import {
  Menubar,

  MenubarMenu,

  MenubarTrigger,
} from "../../components/ui/menubar"
 
export function CustomMenubar() {
  return (
 
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Login</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>SignUp</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
   
  )
}