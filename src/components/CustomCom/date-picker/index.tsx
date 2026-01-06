import { useState, useId } from "react"
import { ChevronDownIcon } from "lucide-react"

export const DatePicker = (props) => {
  const { coms = {}, item = {}, id = useId() } = props
  const {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Label,
    Calendar,
  } = coms
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            id={id}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}

          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
