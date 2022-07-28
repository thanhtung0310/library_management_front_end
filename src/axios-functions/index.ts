import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import type { Action } from 'element-plus'

const baseUrl = 'https://localhost:7123/'

export const HTTP = axios.create({
  baseURL: baseUrl,
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
})

// NOTIFICATIONS
export function serverNotification(type: string) {
  if (type === 'success') {
    ElNotification({
      title: "Success",
      message: "Data refresh!",
      type: "success",
    });
  }

  if (type === 'warning') {
    ElNotification({
      title: "Warning",
      message: "No data loaded!",
      type: "warning",
    });
  }

  if (type === 'error') {
    ElNotification({
      title: "Error",
      message: "Cannot connect to server...",
      type: "error",
    });
  }
}

// MESSAGES
export function requestMessage(type: string, method: string, action?: Action) {
  if (type === 'success') {
    ElMessage({
      message: method + " process completed!",
      type: "success",
    });
  }

  if (type === 'error') {
    ElMessage({
      message: method + " process failed!",
      type: "error",
    });
  }

  if (type === 'info') {
    ElMessage({
      type: "info",
      message:
        action === "cancel"
          ? method + " process cancelled!"
          : "Nothing happen :3",
    });
  }
}

// export function axiosGetAll(controllerName: string, dataSetName: null) {
//   axios
//     .get(baseUrl + controllerName)
//     .then((response) => {
//       if (response.data != null)
//       {
//         dataSetName = response.data;
//         successServerNotification();
//       }
//       else warningServerNotification();
//     })
//     .catch((error) => {
//       errorServerNotification();
//       console.log(error);
//     })
// }

// SHOW MODAL

export function showNCloseModal(id1: string, id2: string) {
  const div1 = document.getElementById(id1)
  const div2 = document.getElementById(id2)
  if (div1 != null && div2 != null) {
    if (div1.style.display === "block") {
      div1.style.display = "none";
      return
    }
    if (
      div1.style.display === "none" ||
      div2.style.display === "block"
    ) {
      div1.style.display = "block";
      div2.style.display = "none";
    }
  }
}

export function showNKeepModal(id1: string, id2: string) {
  const div1 = document.getElementById(id1)
  const div2 = document.getElementById(id2)
  if (div1 != null && div2 != null) {
    if (div1.style.display === "block") {
      div1.style.display = "block";
      return
    }
    if (
      div1.style.display === "none" ||
      div2.style.display === "block"
    ) {
      div1.style.display = "block";
      div2.style.display = "none";
    }
  }
}

// CLOSE MODAL
export function closeModal(id: string) {
  const div = document.getElementById(id);
    if (div != null) {
      div.style.display = "none";
    }
}

// SCROLL TO ANCHOR ELEMENT
export function scrollToAnchor(element: string) {
  location.hash = "#" + element;
}

// export function deleteRow(controllerName: string, rowID: NumberConstructor, method: string) {
//   ElMessageBox.confirm(
//     "This row data will be deleted. Continue?",
//     "Warning",
//     {
//       distinguishCancelAndClose: true,
//       confirmButtonText: "OK",
//       cancelButtonText: "Cancel",
//       draggable: true,
//     }
//   )
//     .then(() => {
//       // call axios delete callback
//       axios
//         .delete(baseUrl + controllerName + "\\" + rowID)
//         .then(() => {
//           // open success message
//           requestMessage('success', method, 'confirm')
//         })
//         .catch((error) => {
//           // open error message
//           requestMessage('error', method, 'confirm')
//           console.log(error);
//         });
//       })
//       .catch((action: Action) => {
//         requestMessage('info', method, action)
//     });
// }