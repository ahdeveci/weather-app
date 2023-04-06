import {Button, DatePicker, Form, Input} from "antd";

interface SearchFormProps {
    onSubmit: (values: any) => void;
};

const SearchForm = ({onSubmit}: SearchFormProps): JSX.Element => {

    const onFormFinished = (values: any) => {
        const {place, date} = values;
        onSubmit({place, date: date?.format('YYYY-MM-DD') || ''});
    };

    return (
        <Form
            wrapperCol={{ span: 24 }}
            layout="inline"
            onFinish={onFormFinished}
            size='large'
            style={{ width: '100%', justifyContent: 'center' }}
        >

            <Form.Item name="place">
                <Input placeholder="Search Place..." />
            </Form.Item>
            <Form.Item name="date">
                <DatePicker placeholder="Date" />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit">Send</Button>
            </Form.Item>
        </Form>
    )
};

export default SearchForm;
