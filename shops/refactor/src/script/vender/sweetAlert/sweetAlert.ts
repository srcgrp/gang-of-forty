import Swal from "sweetalert2";
import "./sweetAlert.css"



const showAddToCartToast = (): void => {
    Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "با موفقیت به سبد خرید اضافه شد",
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true,
        customClass: {
            popup: "minimal-toast",
            title: "minimal-toast-title",
            timerProgressBar: "minimal-toast-progress",
        },
    });
};

export default showAddToCartToast