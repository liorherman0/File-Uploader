document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadProgress = document.getElementById('upload-progress');

    // Function to upload file
    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload.php'); // Replace 'upload.php' with your server-side endpoint
        xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                uploadProgress.textContent = `Uploading: ${Math.round(percentComplete)}%`;
            }
        });
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    uploadProgress.textContent = 'Upload complete!';
                } else {
                    uploadProgress.textContent = 'Upload failed!';
                }
            }
        };
        xhr.send(formData);
    }

    // Event listener for file input change
    fileInput.addEventListener('change', function (event) {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            uploadFile(file);
        }
    });

    // Event listener for upload button click
    uploadBtn.addEventListener('click', function () {
        fileInput.click();
    });
});
