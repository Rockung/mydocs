var jquery_ztree_toc_opts = {
    //目录是否自动编号
    is_auto_number: true,
    //是否展开所有节点
    is_expand_all: false,
    //是否对选中行显示高亮效果
    is_highlight_selected_line: true,
    //根节点名称
    header_nodes_name: '小课堂',
    //扫描header的根dom
    documment_selector: '.markdown-body',
    //ztree配置
    ztreeStyle: {
        width: '326px',
        overflow: 'auto',
        position: 'fixed',
        'z-index': 2147483647,
        border: '0px none',
        left: '0px',
        top: '0px',
        'height': $(window).height() + 'px'
    }
};
var markdown_panel_style = {
    'width': '70%',
    'margin-left': '25%'
};