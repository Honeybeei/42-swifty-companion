import { useSettingsStore } from "@/store/settingsStore";
import { ChevronDownIcon } from "../shared/gluestack-ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../shared/gluestack-ui/select";

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useSettingsStore();

  return (
    <Select
      defaultValue={theme}
      initialLabel={theme.charAt(0).toUpperCase() + theme.slice(1)}
      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
    >
      <SelectTrigger variant="rounded" size="md">
        <SelectInput placeholder="Select theme" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className="pb-8">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Light" value="light" />
          <SelectItem label="Dark" value="dark" />
          <SelectItem label="System" value="system" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

// import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/components/ui/select";
// import { ChevronDownIcon } from "@/components/ui/icon";

// function Example() {
//   return (
//     <Select>
//           <SelectTrigger variant="rounded" size="md" >
//             <SelectInput placeholder="Select option" />
//             <SelectIcon className="mr-3" as={ChevronDownIcon} />
//           </SelectTrigger>
//           <SelectPortal>
//             <SelectBackdrop/>
//             <SelectContent>
//               <SelectDragIndicatorWrapper>
//                 <SelectDragIndicator />
//               </SelectDragIndicatorWrapper>
//               <SelectItem label="UX Research" value="ux" />
//               <SelectItem label="Web Development" value="web" />
//               <SelectItem
//                 label="Cross Platform Development Process"
//                 value="Cross Platform Development Process"
//               />
//               <SelectItem
//                 label="UI Designing"
//                 value="ui"
//                 isDisabled={true}
//               />
//               <SelectItem
//                 label="Backend Development"
//                 value="backend"
//               />
//             </SelectContent>
//           </SelectPortal>
//         </Select>
//   );
// }
