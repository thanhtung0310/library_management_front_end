# FORM RULES

## Short String - Name, Title

```JS
short_string: [
        {
          required: true,
          message: "Please input string name",
          trigger: "blur",
        },
        {
          min: 2,
          max: 200,
          message: "Length should be 2 to 200",
          trigger: "blur",
        },
      ],
```

## Long String - Address, Contact number

```JS
long_string: [
        {
          required: true,
          message: "Please input string name",
          trigger: "blur",
        },
        {
          min: 2,
          max: 200,
          message: "Length should be 2 to 200",
          trigger: "blur",
        },
      ],
```

## Drop-down List

```JS
drop_list: [
            {
            required: true,
            message: "Please select option value",
            trigger: "change",
          },
          ],
```

## Number - ID

## Date

```JS
date: [
        {
          required: true,
          type: "date",
          message: "Please pick a date",
          trigger: "change",
        },
      ],
```

## Type - Tag

```JS
type: [
        {
          required: true,
          type: "array",
          message: "Please select at least one type",
          trigger: "change",
        },
      ],
```
