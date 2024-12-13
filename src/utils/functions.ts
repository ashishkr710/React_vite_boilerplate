export function fetchNestedValueByDotOperator(object: any, value: string) {
  return value?.split(".")?.reduce((acc, curr) => {
    if (Array.isArray(acc)) {
      // Convert current value to a number index if it's an array
      const index = parseInt(curr, 10);
      return acc[index];
    } else if (acc && typeof acc === "object") {
      return acc[curr];
    }
    return undefined;
  }, object);
}
