function cancel() {
    const cancel_btn = document.getElementById("back_categori");
    localStorage.clear();
    if (window.location.hash === "#f_wt_board"){
        cancel_btn.href = "#fashion"
    }else if (window.location.hash === "#fo_wt_board") {
        cancel_btn.href = "#food"
    }else if (window.location.hash === "#t_wt_board") {
        cancel_btn.href = "#travel"
    }else if (window.location.hash === "#s_wt_board") {
        cancel_btn.href = "#sports"
    }else if (window.location.hash === "#e_wt_board") {
        cancel_btn.href = "#entertainment"
    }
}
