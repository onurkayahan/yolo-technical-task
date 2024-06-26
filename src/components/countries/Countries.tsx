import { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import countriesStore from "../../stores/countriesStore";
import { observer } from "mobx-react-lite";
import Wrapper from "./styles";
import CountriesSearch from "./search/CountriesSearch";
import CountriesTable from "./countries-table/CountriesTable";

const Countries = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    countriesStore.fetchCountries();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const filteredCountries = countriesStore.countries.filter((country) =>
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (countriesStore.loading) {
    return <CircularProgress />;
  }

  if (countriesStore.error) {
    return (
      <Typography color="error">
        Error: {countriesStore.error.message}
      </Typography>
    );
  }

  return (
    <Wrapper>
      <Card className="card">
        <CardHeader
          title="Countries Table"
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardContent>
          <CountriesSearch
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
          <div className="table-container">
            <CountriesTable countries={filteredCountries} />
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
});

export default Countries;
