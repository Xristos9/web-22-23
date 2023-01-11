<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->

	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
	<title>Upload</title>
</head>
<body>
	<!-- Navbar -->
	<?php include "adminNavbar.php"; ?>
	<br><br>
	<div class="filler">
		<!-- Showcase -->
		<section class="bg-primary text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
			<div class="container">
				<div class="d-sm-flex align-items-center justify-content-between">
					<div>
					<label class="form-label">Stores</label>
					<div class="input-group">
						<input type="file" class="form-control" id="storesUpload" aria-label="Upload" accept=".json" onchange="storesUpload(this)">
						<button class="btn btn-dark" type="button" id="storesUploadButton">Submit</button>
					</div><br>
					</div>
				</div>
				<div class="d-sm-flex align-items-center justify-content-between">
					<div><br>
					<label class="form-label">Products and Categories</label>
					<div class="input-group">
						<input type="file" class="form-control" id="categoriesProductsUpload" aria-label="Upload" accept=".json" onchange="categoriesProductsUpload(this)">
						<button class="btn btn-dark" type="button" id="categoriesProductsUploadButton">Submit</button>
					</div><br>
					</div>
				</div>
				<div class="d-sm-flex align-items-center justify-content-between">
					<div><br>
					<label class="form-label">Prices</label>
					<div class="input-group">
						<input type="file" class="form-control" id="pricesUpload" aria-label="Upload" accept=".json" onchange="pricesUpload(this)">
						<button class="btn btn-dark" type="button" id="pricesUploadButton">Submit</button>
					</div><br>
					</div>
				</div>
			</div>
		</section>
	</div>
		<!-- Footer -->
	<?php include "footer.php";?>
	<script src="upload.js"></script>
</body>
</html>