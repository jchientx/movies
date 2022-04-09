let Id = 0;
let moviesList = [];

$(function () {
  $("#movie-input-form").on("submit", function (e) {
    e.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, Id };
    const dataToHTML = createMovieDataOnHTML(movieData);

    Id++;
    moviesList.push(movieData);

    $("#movie-table-body").append(dataToHTML);
    $("#movie-input-form").trigger("reset");
  });

  $("tbody").on("click", ".delete", function (e) {
    let removeIndexAt = moviesList.findIndex(
      (movie) => movie.Id === +$(e.target).attr("id")
    );

    moviesList.splice(removeIndexAt, 1);

    $(e.target).closest("tr").remove();
  });

  $(".fas").on("click", function (e) {
    let sortKey = $(e.target).attr("id");
    let direction = $(e.target).hasClass("fa-sort-amount-down") ? "down" : "up";
    let sortedMovies = sortCriteria(moviesList, sortKey, direction);

    $("#movie-table-body").empty();

    for (let movie of sortedMovies) {
      const dataToHTML = createMovieDataOnHTML(movie);
      $("#movie-table-body").append(dataToHTML);
    }

    $(e.target).toggleClass("fa-sort-amount-down");
    $(e.target).toggleClass("fa-sort-amount-up");
  });
});

function sortCriteria(array, sortKey, direction) {
  return array.sort(function (a, b) {
    if (sortKey === "rating") {
      a[sortKey] = +a[sortKey];
      b[sortKey] = +b[sortKey];
    }
    if (a[sortKey] > b[sortKey]) {
      return direction === "up" ? 1 : -1;
    } else if (a[sortKey] < b[sortKey]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

function createMovieDataOnHTML(data) {
  return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td><button class="delete btn btn-warning" id=${data.Id}>Delete</button></td>
    </tr>
    `;
}
