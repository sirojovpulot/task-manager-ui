const flatten = (categories, flattenedList) => {
    categories?.forEach(category => {
        flattenedList.push(category);
        if (category?.children && category?.children?.length > 0) {
            flatten(category.children, flattenedList);
        }
    });
}



export const flattenCategories = (categories) => {
    const flattenedList = [];
    flatten(categories, flattenedList);
    return flattenedList;
}