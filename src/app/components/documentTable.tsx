
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Document {
  id: string;
  filename: string;
  $createdAt: string;
  fileLink: string;
}
interface DocumentTableProps {
  data: {
    documents: Document[];
  };
}

const DocumentTable: React.FC<DocumentTableProps> = ({ data }) => {

  return (

    <Table>
      <TableCaption>A list of your recent Uploads.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Document Name</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>File</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.documents.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.filename}</TableCell>
            <TableCell>{data.$createdAt}</TableCell>
            <TableCell>
              <a href={data.fileLink} target="_blank">view</a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentTable;
