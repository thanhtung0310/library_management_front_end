<template>
  <div class="home">
    <WelcomeUser />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WelcomeUser from "@/views/shared/WelcomeUser.vue";
// import {
//   ElMessage,
//   ElMessageBox,
//   // ElLoading,
//   FormInstance,
//   FormRules,
// } from "element-plus";
// import type { Action } from "element-plus";

export default defineComponent({
  name: "HomeView",
  components: {
    WelcomeUser,
  },
  // data() {
  //   return {
  //     fullscreenLoading: false,
  //     formSize: ref("default"),
  //     labelPosition: ref("left"),
  //     ruleFormRef: ref<FormInstance>(),
  //     percentage: ref(0),
  //     colors: [
  //       { color: "#f56c6c", percentage: 20 },
  //       { color: "#e6a23c", percentage: 40 },
  //       { color: "#5cb87a", percentage: 60 },
  //       { color: "#1989fa", percentage: 80 },
  //       { color: "#6f7ad3", percentage: 100 },
  //     ],
  //     ruleForm: reactive({
  //       name: "",
  //       region: "",
  //       count: "",
  //       date1: "",
  //       date2: "",
  //       delivery: false,
  //       type: [],
  //       resource: "",
  //       desc: "",
  //     }),
  //     rules: reactive<FormRules>({
  //       name: [
  //         {
  //           required: true,
  //           message: "Please input book title",
  //           trigger: "blur",
  //         },
  //         {
  //           min: 3,
  //           max: 5,
  //           message: "Length should be 3 to 5",
  //           trigger: "blur",
  //         },
  //       ],
  //       region: [
  //         {
  //           required: true,
  //           message: "Please select publisher",
  //           trigger: "change",
  //         },
  //       ],
  //       count: [
  //         {
  //           required: true,
  //           message: "Please select Activity count",
  //           trigger: "change",
  //         },
  //       ],
  //       date1: [
  //         {
  //           type: "date",
  //           required: true,
  //           message: "Please pick a date",
  //           trigger: "change",
  //         },
  //       ],
  //       date2: [
  //         {
  //           type: "date",
  //           required: true,
  //           message: "Please pick a time",
  //           trigger: "change",
  //         },
  //       ],
  //       type: [
  //         {
  //           type: "array",
  //           required: true,
  //           message: "Please select at least one activity type",
  //           trigger: "change",
  //         },
  //       ],
  //       resource: [
  //         {
  //           required: true,
  //           message: "Please select activity resource",
  //           trigger: "change",
  //         },
  //       ],
  //       desc: [
  //         {
  //           required: true,
  //           message: "Please input activity form",
  //           trigger: "blur",
  //         },
  //       ],
  //     }),
  //     options: Array.from({ length: 10000 }).map((_, idx) => ({
  //       value: `${idx + 1}`,
  //       label: `${idx + 1}`,
  //     })),
  //     tableData: [
  //       {
  //         date: "2016-05-03",
  //         name: "Tom",
  //         state: "California",
  //         city: "Los Angeles",
  //         address: "No. 189, Grove St, Los Angeles",
  //         zip: "CA 90036",
  //         tag: "Home",
  //       },
  //       {
  //         date: "2016-05-02",
  //         name: "Tom",
  //         state: "California",
  //         city: "Los Angeles",
  //         address: "No. 189, Grove St, Los Angeles",
  //         zip: "CA 90036",
  //         tag: "Office",
  //       },
  //       {
  //         date: "2016-05-04",
  //         name: "Tom",
  //         state: "California",
  //         city: "Los Angeles",
  //         address: "No. 189, Grove St, Los Angeles",
  //         zip: "CA 90036",
  //         tag: "Home",
  //       },
  //       {
  //         date: "2016-05-01",
  //         name: "Tom",
  //         state: "California",
  //         city: "Los Angeles",
  //         address: "No. 189, Grove St, Los Angeles",
  //         zip: "CA 90036",
  //         tag: "Office",
  //       },
  //     ],
  //   };
  // },
  // methods: {
  //   handleClick() {
  //     console.log("click");
  //   },
  //   // open delete confirmation modal
  //   openDeleteModal() {
  //     ElMessageBox.confirm(
  //       "This row data will be deleted. Continue?",
  //       "Warning",
  //       {
  //         distinguishCancelAndClose: true,
  //         confirmButtonText: "OK",
  //         cancelButtonText: "Cancel",
  //         type: "warning",
  //         draggable: true,
  //       }
  //     )
  //       .then(() => {
  //         ElMessage({
  //           type: "success",
  //           message: "Delete process completed!",
  //         });
  //       })
  //       .catch((action: Action) => {
  //         ElMessage({
  //           type: "info",
  //           message:
  //             action === "cancel"
  //               ? "Delete process cancelled!"
  //               : "Nothing happen :3",
  //         });
  //       });
  //   },
  //   // open insert modal (not done)
  //   openInsertModal() {
  //     ElMessageBox.prompt("Please input your e-mail", "Tip", {
  //       confirmButtonText: "OK",
  //       cancelButtonText: "Cancel",
  //       inputPattern:
  //         /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  //       inputErrorMessage: "Invalid Email",
  //     })
  //       .then(({ value }) => {
  //         ElMessage({
  //           type: "success",
  //           message: `Your email is:${value}`,
  //         });
  //       })
  //       .catch(() => {
  //         ElMessage({
  //           type: "info",
  //           message: "Input canceled",
  //         });
  //       });
  //   },
  //   // loading full screen
  //   openFullLoadingScreen() {
  //     this.fullscreenLoading = true;
  //     setTimeout(() => {
  //       this.fullscreenLoading = false;
  //     }, 2000);
  //   },
  //   // submit form
  //   submitForm(formEl: FormInstance | undefined) {
  //     if (!formEl) return;
  //     formEl.validate((valid, fields) => {
  //       if (valid) {
  //         console.log("submit!");
  //       } else {
  //         console.log("error submit!", fields);
  //       }
  //     });
  //   },
  //   // reset form input
  //   resetForm(formEl: FormInstance | undefined) {
  //     if (!formEl) return;
  //     formEl.resetFields();
  //   },
  // },
  // onMounted(() => {
  //   setInterval(() => {
  //   percentage.value = (percentage.value % 100) + 20
  // }, 500)
  // }),
});
</script>