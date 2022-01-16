/**
 * The function to find DOM elements according to an attribute from
 * a wrapper
 *
 * @param wrapper - the Enzyme wrapper
 * @param attribute the data-test attribute value
 * @returns - the element/s whose data-test value = attribute
 */
const findByAttribute = (wrapper: any, attribute: string) => wrapper?.find(`[data-test='${attribute}']`);

export default findByAttribute;
