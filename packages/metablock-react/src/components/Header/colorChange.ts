interface ChangeColorOnScroll {
  height: number;
  color: string;
}

const headerColorChange = (
  changeColorOnScroll: ChangeColorOnScroll,
  classes: Record<string, string>,
  color: string,
  setColorChange: any
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
      setColorChange(true);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
      setColorChange(false);
    }
  };
};

export default headerColorChange;
