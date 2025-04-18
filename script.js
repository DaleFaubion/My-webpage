/**
 * @author: Dale Faubion <dalefaubion@gmail.com>
 * @date: 2/4/25
 */

/** Script for the close button */
// Get all elements that are close buttons
let close = document.getElementsByClassName("closebtn");
let i;
// Loop through all close buttons, if they get clicked, hide the banner it is connected to.
for (i = 0; i < close.length; i++)
{
    // If a button is clicked, run this function to hide the banner it is connected to.
    close[i].onclick = function()
    {
        // Get the banner/element the button is connected to
        let div = this.parentElement;
        // Set it to invisible: opacity = "0"
        div.style.opacity = "0";
        // Fade the view until it is gone, disappearing after the time below (.6 seconds)
        setTimeout(function(){ div.style.display = "none"; }, 600); // Timeout after .6 seconds and hide
    }
}


/** Slideshow JS stuff **/

// Declare variable to keep track of which slide we're on
let slideIndex = 0;
let slideTimer; // Store the timer

showSlides();
/**
 * Function to change slides every 3.5 seconds, as determined below.
 * Since this is called above, it runs while the page is open.
 *
 * To change the speed at which the slides change, see below.
 */
function showSlides(n = 0)
{
    let i;
    // Get all elements in the page that have class="mySlides"
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Go through each of the slides and make sure they are hidden
    for (i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++)
    {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // If n > 0, a dot was clicked
    if (n > 0)
    {
        slideIndex = n;
    }
    // a dot was clicked to switch slides
    else
    {
        // Move to next slide
        slideIndex++;
    }

    // If we are at the last slide, go to beginning
    if (slideIndex > slides.length)
    {
        slideIndex = 1;
    }

    // Display the slide that is active at the moment
    slides[slideIndex-1].style.display = "block";
    // Set current dot to active
    dots[slideIndex-1].className += " active";

    // CHANGE THIS if it should take longer or shorter to change slides (in milliseconds)
    // Reset the timer whenever a dot is clicked
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => showSlides(), 3500); // Change image every 3.5 seconds
}


