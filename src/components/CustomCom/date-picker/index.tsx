import { useState, useId, useContext } from "react"
import { ChevronDownIcon } from "lucide-react"
import { FormContext } from "../../FormContext";
import { format, subDays } from "date-fns"
import { zhCN } from "react-day-picker/locale";
import './index.css'

const defSetting = {
  locale: zhCN
}

export const DatePicker = (props) => {
  const { coms = {}, item = {}, id = useId() } = props
  const {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Calendar,
  } = coms
  const {
    setting = {},
    dataPickerType = 'day',
  } = item

  let settings = {
    ...defSetting, ...setting
  }
  const { dispatchQueryParams, queryParams, formLoading, } = useContext(FormContext);
  const [open, setOpen] = useState(false)
  let dataLabel = settings.placeholder || "请选择日期"

  if (dataPickerType === 'day') {
    settings = {
      ...settings,
      mode: "single",
      captionLayout: "dropdown",
      selected: queryParams[item.prop] || undefined,
      onSelect: (date) => {
        dispatchQueryParams({ data: { ...queryParams, [item.prop]: date } })
        setOpen(false)
      }
    }
    dataLabel = queryParams[item.prop] ? queryParams[item.prop].toLocaleDateString() : dataLabel
  }
  if (dataPickerType === 'month') {
    settings = {
      ...settings,
      captionLayout: "dropdown",
      month: queryParams[item.prop] || undefined,
      onMonthChange: (date) => {
        dispatchQueryParams({ data: { ...queryParams, [item.prop]: date } })
      },
      className: "general-basic-form-month-picker [&_table]:hidden",
    }
    dataLabel = queryParams[item.prop] ? (`${queryParams[item.prop].getFullYear()}/${queryParams[item.prop].getMonth() + 1}`) : dataLabel
  }
  if (dataPickerType === 'range') {
    settings = {
      ...settings,
      format: "yyyy-MM-dd",
      mode: "range",
      selected: queryParams[item.prop] || {
        from: subDays(new Date(), 30),
        to: new Date(),
      },
      onSelect: (date) => {
        dispatchQueryParams({ data: { ...queryParams, [item.prop]: date } })
      },
      numberOfMonths: 2

    }

    dataLabel = queryParams[item.prop]?.from ? (
      queryParams[item.prop]?.to ? (
        <>
          {format(queryParams[item.prop].from, settings.format)} -{" "}
          {format(queryParams[item.prop].to, settings.format)}
        </>
      ) : (
        format(queryParams[item.prop].from, settings.format)
      )
    ) : dataLabel
  }

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            name={item.prop}
            className="w-full justify-between font-normal"
            disabled={formLoading}
          >
            {dataLabel}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={formLoading}

            {...settings}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
