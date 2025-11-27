import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ClassSelector({ classes, onSelect }) {
  return (
    <Select onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a classroom" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>classrooms</SelectLabel>
          {classes.map((cls) => (
            <SelectItem key={cls} value={cls}>
              {cls}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
