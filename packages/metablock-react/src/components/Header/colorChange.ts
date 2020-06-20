interface ChangeColorOnScroll {
  height: number;
  color: string;
}

const headerColorChange = (
  changeColorOnScroll: ChangeColorOnScroll,
  classes: Record<string, string>,
  color: string
) => {
  return () => {
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
};

export default headerColorChange;
