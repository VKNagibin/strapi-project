const copyBtn = document.querySelectorAll('.copy-address')

const copyUp = copyBtn[0]
const copyDown = copyBtn[1]

function copyUrl (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', () => {
            window.navigator.clipboard.writeText(window.location.href)
        });
}

export default function () {
    copyUrl(copyUp)
    copyUrl(copyDown)
}