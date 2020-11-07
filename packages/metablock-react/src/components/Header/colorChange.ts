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
        .classList.remove(...classes[color].split(" "));
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(...classes.colorChange.split(" "));
      setColorChange(true);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(...classes[color].split(" "));
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(...classes.colorChange.split(" "));
      setColorChange(false);
    }
  };
};

export default headerColorChange;
