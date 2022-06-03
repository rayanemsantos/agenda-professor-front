import { toast } from 'react-toastify';

export default {
    showMessage(message, type, options) {
        toast(message, { ...options, type });
    }
}