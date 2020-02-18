function SearchMovie() {
	$('#movie').html('');
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'fc563000',
			's': $('#search-input').val()
		},
		success: function (result) {
			// console.log(result);
			if (result.Response == "True") {
				let Movie = result.Search;
				// console.log(Movie);
				$.each(Movie, function (i, data) {
					$('#movie').append(`
					<div class="col-md-4">
						<div class="card" >
						<img class="card-img-top" src="` + data.Poster + `" alt="Card image cap">
						<div class="card-body">
							<h5 class="card-title">` + data.Title + `</h5>
							<h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
							<a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#Detail" data-id="` + data.imdbID + `">Detail</a></a>
						</div>
					</div>
					</div>
						`);
				});
				$('#search-input').val('');


			} else {
				// $('#movie').html('<h3 class="text-center">Movie Not Found!!!</h3>')
				$('#movie').html(`
				<div class="col">				
				<h3 class="text-center">` + result.Error + `</h3>
				</div>
				`)
			}
		}
	});
}

$('#search').on('click', function () {
	SearchMovie();
});

$('#search-input').on('keyup', function (e) {
	if (e.keyCode == 13) {
		SearchMovie();
	}
});

$('#movie').on('click', '.see-detail', function () {
	// console.log($(this).data('id'));
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'fc563000',
			'I': $(this).data('id')
		},
		success: function (Movie) {
			// console.log(Movie);

			if (Movie.Response == "True") {
				$('#Title').html(`
				<h3 class="card-title text-center">` + Movie.Title + `</h3>
				`);

				$('.modal-body').html(`
							<div class="container-fluid">
					<div class="row">
						<div class="col-md-4">
						<img class="img-fluid" src="` + Movie.Poster + `" >
						</div>
						<div class="col-md-8">

							<ul class="list-group">
								
								<li class="list-group-item">Releases : ` + Movie.Released + `</li>
								<li class="list-group-item">Genre : ` + Movie.Genre + `</li>
								<li class="list-group-item">Director : ` + Movie.Director + `</li>
								<li class="list-group-item">Actor : ` + Movie.Actors + `</li>
								<li class="list-group-item">Runtime : ` + Movie.Runtime + `</li>
								<li class="list-group-item">language : ` + Movie.Language + `</li>
								<li class="list-group-item">Plot : ` + Movie.Plot + `</li>

							</ul>
						</div>
					</div>
				</div>
			`);
			}
		}
	});
});