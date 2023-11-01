function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

init()

var crsr = document.querySelector("#cursor")
var main = document.querySelector("#main")
main.addEventListener("mousemove", function(dets){
    crsr.style.left = dets.x + "px"
    crsr.style.top = dets.y + "px"
})
var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page1 h1",
        scroller:"#main",
        // markers: true,
        start: "top 28%",
        end: "top 0",
        scrub: 3
    }
})
tl.to("#page1 h1",{
    x:-100,

    
},"flag")
tl.to("#page1 h2",{
    x:100,

    
},"flag")
tl.to("#page1 img",{
    width: "85%",

},"flag")

var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:"#page1 h1",
        scroller:"#main",
        // markers: true,
        start: "top -10%",
        end: "top -5%",
        scrub: 3
    }
})

tl2.to("#main, #page2",{
    backgroundColor: "#fff",

},"flag2")
tl2.from("#page2 h1",{
    x:100
},"flag2")
tl2.from("#page2left",{
    x:-100
},"flag2")
tl2.from("#page2right",{
    y:-100
},"flag2")

var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:"#page1 h1",
        scroller:"#main",
        // markers: true,
        start: "top -55%",
        end: "top -20%",
        scrub: 3
    }
})
tl3.to("#page3",{
    backgroundColor: "black",
},"flag3")
tl3.from("#page3 h1",{
    x:100,
    opacity:0,
    color:"white"
},"flag3")
tl3.from("#page3left",{
    opactiy:0,
    x:-300
},"flag3")
tl3.from("#page3right  img",{
    opacity:0,
    x:100
}, "flag3")

var tl4 = gsap.timeline({
    scrollTrigger:{
        trigger:"#page1 h1",
        scroller:"#main",
        // markers: true,
        start: "top -15%",
        end: "top -20%",
        scrub: 3
    }
})

var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        crsr.style.width = "470px"
        crsr.style.height = "370px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        crsr.style.width = "20px"
        crsr.style.height = "20px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})

