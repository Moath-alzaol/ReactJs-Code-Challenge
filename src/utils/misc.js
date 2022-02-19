import swal from "sweetalert";

export const handleResponse = ({ success, ...rest }) => ({ success, ...rest });

export const displayAlert = (title, text, icon, buttons, className = "", timer) => swal({ title, text, icon, buttons, className, timer });

export const windowHeight = window.innerHeight;
