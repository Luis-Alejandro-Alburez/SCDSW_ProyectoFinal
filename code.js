/* AWS.config.update({
  region: "eu-north-1", // región de tu S3
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-north-1:8cccb201-0920-4f8b-9817-42e74cf031b5", // Usa Cognito para obtener credenciales de seguridad
  }),
}); */

AWS.config.update({
  accessKeyId: "AKIA4BBVMSRCAYMASZUZ",
  secretAccessKey: "VIW0T/MmCFydT92ZPW5jw0MdkYRqzqCR6z1XQZu0Fy4BlE",
  region: "eu-north-1", // región de tu S3
  /* credentials: {
    
  }, */
});

const s3 = new AWS.S3();

document.getElementById("upload-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("file-input").files[0];
  if (!file) return;

  const params = {
    Bucket: "bucket-de-imagenes-proyecto ", // nombre de tu bucket de imágenes
    Key: file.name,
    Body: file,
    /*  ContentType: "image/png", */
    ContentType: file.type,
    /* ACL: "public-read", // Asegúrate de bloquear el acceso público después */
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error al subir la imagen:", err);
    } else {
      console.log("Imagen subida con éxito:", data);
      // Mostrar la imagen en el frontend
      displayImage(data.Location);
    }
  });
});

function displayImage(imageUrl) {
  const imageGallery = document.getElementById("image-gallery");
  const img = document.createElement("img");
  img.src = imageUrl;
  imageGallery.appendChild(img);
}

function searchImage(fileName) {
  const params = {
    Bucket: "bucket-de-imagenes-proyecto ",
    Prefix: fileName,
  };

  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      console.log("Error al buscar la imagen:", err);
    } else {
      data.Contents.forEach(function (item) {
        displayImage(
          `https://bucket-de-imagenes-proyecto.s3.amazonaws.com/${item.Key}`
        );
      });
    }
  });
}
