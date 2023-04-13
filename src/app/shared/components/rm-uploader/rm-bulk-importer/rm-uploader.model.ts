export class RMAttachmentFile {
    fileId!: string | number;
    fileDetails!: File | string;
    isUploaded!: boolean;
    uploadingPercentage?: number;
    uploadingStatusText?: string;
    fileName!: string;
    fileSize?: number; // in bytes
    extension?: string;
    extractedData?: object; // Store JSON
    errorMsgs?: string[] = [];
    foundError?: boolean;
}

export class RMBulkDataImporterModel {
    fieldName!: string;
    isRequired!: boolean;
    outputFieldName!: string;
    foreignKey?: string;
    dataKey?: string;
    foreignKeyData?: any[];
}