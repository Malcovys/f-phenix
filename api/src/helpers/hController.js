function countDigits (number) {
    return number.toString().length;
}

function getIdPart (idTextPart, rowCountdigitsLeght) {
    if(rowCountdigitsLeght == 1) return idTextPart + '00'; 
    else if (rowCountdigitsLeght == 2) return idTextPart + '0'; 
    else if (rowCountdigitsLeght == 3) return idTextPart; 
}

module.exports.defineNextId = function (tableAbbreviation, rowCount) {
    let textPartId = tableAbbreviation + '-';
    idPart = getIdPart(textPartId, countDigits(rowCount));
    return idPart + (rowCount ? rowCount + 1 : rowCount);
}