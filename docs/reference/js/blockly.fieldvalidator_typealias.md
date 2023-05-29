## FieldValidator type

A function that is called to validate changes to the field's value before they are set.

**Signature:**

```javascript
export type FieldValidator<T = any> = (newValue: T) => T | null | undefined;
```