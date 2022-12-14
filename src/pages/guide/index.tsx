import { Box, Text, Button, Divider, Flex, Heading, HStack, Select, SimpleGrid, VStack, Icon, Table, Thead, Th, Tbody, Td, Tr, Avatar, Tooltip, TabPanel, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from 'react-query'
import NextLink from "next/link";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import useSWR from "swr";
import { getAuthCookie } from "../../utils/auth-cookies";
import { RiLock2Line } from "react-icons/ri";

type CreateUserFormData = {
  name: string;
  email: string;
  id: string;
  role:string;
  department:string;
  image_url:string;
  password: string;
  password_confirmation: string;
};



export default function Guide() {
  const router = useRouter()

  const fetcher = (url: any) => fetch(url).then((r) => r.json());
  const { data: rewards, mutate: mutateReward } = useSWR('/api/reward/getAll', fetcher);
  
  const { data:tasks, isLoading:isLoadingTasks, error:errorTasks} = useQuery('tasks', async () => {
    const response = await api.get('/tasks/getAll')
    
    const tasks = response.data?.map(task => {
      return {
        id: task['ref']['@ref'].id,
        title: task.data.title,
        score: task.data.score,
        description: task.data.description,
        frequency: task.data.frequency,
        created_at: task.data.created_at,
      };
    })
    return tasks.sort((a,b) => (a.title > b.title) ? 1 : -1);
  })
  const { data:badges, isLoading:isLoadingBadges, error:errorBadges} = useQuery('badges', async () => {
    const response = await api.get('/badges/getAll')
    
    const badges = response.data?.map(badge => {
      return {
        id: badge['ref']['@ref'].id,
        title: badge.data.title,
        score: badge.data.score,
        description: badge.data.description,
        icon: badge.data.icon,
        created_at: badge.data.created_at,
      };
    })
    return badges.sort((a,b) => (a.title > b.title) ? 1 : -1);
  })
  

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Flex mb="8" justify="space-between" align="left">
            <VStack>
              <Heading mb={"4"} size="lg" fontWeight="normal" alignContent={"flex-start"}>
              Guia da Gamifica????o
              </Heading>
              <section>
                <Heading mb={"4"} size="md" fontWeight="normal" alignContent={"left"} textAlign={"left"} alignSelf={'left'}>
                O que ?? gamifica????o ?
                </Heading>
                <Text mb={"8"}>
                  Consiste em usar t??cnicas, estrat??gias e o design de games em outros contextos a fim de solucionar problemas e melhorar o n??vel de aprendizado motivando a????es orientadas a tr??s fatores da psicologia humana e comportamental: motiva????o, habilidade e est??mulo. 
                </Text>
                <Heading mb={"4"} size="md" fontWeight="normal" alignContent={"left"} textAlign={"left"} alignSelf={'left'}>
                  O que ?? o ASGP Game ?
                </Heading>
                <Text mb={"8"}>
                  Trata-se de um jogo para incentivar e reconhecer a alta performance do time ASGP.
                </Text>
                <Heading mb={"4"} size="md" fontWeight="normal" alignContent={"left"} textAlign={"left"} alignSelf={'left'}>
                  Qual ?? o ciclo do game ?
                </Heading>
                <Text mb={"8"}>
                  O ciclo 2023 da gamifica????o inicar?? em 02/01/2023 e contar?? com reconhecimentos trimestrais.
                </Text>
                <Heading mb={"4"} size="md" fontWeight="normal" alignContent={"left"} textAlign={"left"} alignSelf={'left'}>
                  Quais s??o os elementos do game ?
                </Heading>
                <Text mb={"6"}>
                  Para o ciclo utilizaremos os elementos: Jogadores, Conquistas, Entregas e Recompensas.;
                </Text>
                <Tabs>
                  <TabList>
                    <Tab>Jogadores</Tab>
                    <Tab>Entregas</Tab>
                    <Tab>Conquistas</Tab>
                    <Tab>Recompensas</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Text mb={"6"}>
                        Os jogadores ser??o os colaboradores da ASGP.
                      </Text>
                    </TabPanel>
                    <TabPanel>
                      <Table>
                        <Thead>
                          <Tr >
                            <Th justifyContent={"center"}>Entrega</Th>
                            <Th justifyContent={"center"}>Per??odo</Th>
                            <Th justifyContent={"center"}>Pontua????o</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {tasks?.map(task=>(
                            <Tr key={task?.title}>
                              <Td>{task?.title}</Td>
                              <Td>{task?.frequency}</Td>
                              <Td>{task?.score}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>
                    <TabPanel>
                      <Table>
                        <Thead>
                          <Tr >
                            <Th justifyContent={"center"}>Conquista</Th>
                            <Th justifyContent={"center"}>Descri????o</Th>
                            <Th justifyContent={"center"}>Pontua????o</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {badges?.map((badge, index)=>(
                            <Tr key={badge?.title}>
                              <Td><Tooltip key={index} hasArrow label={`${badge?.title}`} placement='top'><Avatar key={badge?.title} name={badge?.title} src={`/badges/${badge?.title}.png`} /></Tooltip></Td>
                              <Td>{badge?.description}</Td>
                              <Td>{badge?.score}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>
                    <TabPanel>
                      <Table>
                        <Thead>
                          <Tr >
                            <Th justifyContent={"center"}>Recompensa</Th>
                            <Th justifyContent={"center"}>Pontua????o</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {rewards?.map(reward=>(
                            <Tr key={reward?.data?.title}>
                              <Td>{reward?.data?.title}</Td>
                              <Td>{reward?.data?.score}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </section>



            </VStack>

            
          </Flex>

        </Box>
      </Flex>
    </Box>
  );
}

export async function getServerSideProps({res, req, params}) {
  const token = getAuthCookie(req);
  if(!token){
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  
  return { props: { token: token || null } };
}
