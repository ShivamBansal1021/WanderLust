const stars = document.querySelector('.star-rating');
const ratingStars = document.querySelectorAll(".star");
const ratingValue = document.getElementById('rating-value');
const rating = document.querySelector(".rating");

stars.addEventListener("click", (event) => {
    let star = event.target;
    if (event.target.classList[0] == "star") {
        for (s of ratingStars) {
            s.classList.remove('selected');
        }

        let previousSibling = star;
        while (previousSibling) {
            previousSibling.classList.add('selected');
            previousSibling = previousSibling.nextElementSibling;
        }
        ratingValue.innerText = star.attributes[1].value;
        rating.value = ratingValue.innerText;
    }
});

