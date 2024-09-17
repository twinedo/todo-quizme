export type TActionSheetProps = {
    onReset?: () => void;
    onSubmit?: (val: string) => void;
    onClose?: () => void;
    value?: string;
}