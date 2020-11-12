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
    const defaults = classes.defaultColor.split(" ");
    const change = classes.colorChange.split(" ");
    const header = document.body.getElementsByTagName("header")[0];
    if (windowsScrollTop > changeColorOnScroll.height) {
      header.classList.remove(...defaults);
      header.classList.add(...change);
      setColorChange(true);
    } else {
      header.classList.remove(...change);
      header.classList.add(...defaults);
      setColorChange(false);
    }
  };
};

export default headerColorChange;
