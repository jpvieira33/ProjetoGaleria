import $ from 'jquery'

const loadHtmlSucessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[include]').each(function(i,e){
        const url = $(e).attr('include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('include')

                loadHtmlSucessCallbacks.forEach(callback => callback(data))

                loadIncludes(e)
            }
        })
    })
}

loadIncludes()