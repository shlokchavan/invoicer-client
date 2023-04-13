
export const CustomLinkHeaderTemplate = (
    removeTitle?: boolean,
    icon?: string
) => {
    const dataHTML = (removeTitle && icon ? `<span class="svg_icon rm-icon_${icon}"> </span>` : `<span ref="eText" class="ag-header-cell-text" role="columnheader"></span>`);
    return `<div class="ag-cell-label-container" role="presentation">
        <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>
        <div ref="eLabel" class="ag-header-cell-label" role="presentation">
        <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>
        <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>
        <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>
        <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>
        <a href="https://ag-grid.com" target="_blank"> 
            ${dataHTML}
        </a> 
        <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>
        </div>
    </div>`
}